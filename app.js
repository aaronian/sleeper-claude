// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    username: 'tcbx1000',
    // Will auto-detect season from NFL state
};

// ============================================
// API FUNCTIONS
// ============================================

const API_BASE = 'https://api.sleeper.app/v1';

async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
}

async function getUser(username) {
    return fetchJSON(`${API_BASE}/user/${username}`);
}

async function getNFLState() {
    return fetchJSON(`${API_BASE}/state/nfl`);
}

async function getUserLeagues(userId, season) {
    return fetchJSON(`${API_BASE}/user/${userId}/leagues/nfl/${season}`);
}

async function getLeagueUsers(leagueId) {
    return fetchJSON(`${API_BASE}/league/${leagueId}/users`);
}

async function getLeagueRosters(leagueId) {
    return fetchJSON(`${API_BASE}/league/${leagueId}/rosters`);
}

async function getLeagueMatchups(leagueId, week) {
    return fetchJSON(`${API_BASE}/league/${leagueId}/matchups/${week}`);
}

async function getLeague(leagueId) {
    return fetchJSON(`${API_BASE}/league/${leagueId}`);
}

// Player names - fetch once and cache
let playersCache = null;
async function getPlayers() {
    if (playersCache) return playersCache;
    // This is a large file (~7MB), so we cache it
    playersCache = await fetchJSON(`${API_BASE}/players/nfl`);
    return playersCache;
}

// ============================================
// APP STATE
// ============================================

let appState = {
    user: null,
    leagues: [],
    leagueData: {}, // { leagueId: { users, rosters, matchups, league } }
    nflState: null,
    players: null,
    currentView: 'simple',
    selectedLeague: 'all',
    loading: true,
    error: null
};

// ============================================
// DATA LOADING
// ============================================

async function loadAllData() {
    try {
        showLoading('Loading your data...');

        // Get NFL state and user in parallel
        const [nflState, user] = await Promise.all([
            getNFLState(),
            getUser(CONFIG.username)
        ]);

        appState.nflState = nflState;
        appState.user = user;

        // Use previous_season if current season leagues aren't available yet
        const season = nflState.previous_season;
        showLoading(`Loading ${season} leagues...`);

        // Get user's leagues
        const leagues = await getUserLeagues(user.user_id, season);
        appState.leagues = leagues;

        // Update league selector
        updateLeagueSelector(leagues);

        // Load data for each league in parallel
        showLoading('Loading league details...');
        await Promise.all(leagues.map(league => loadLeagueData(league)));

        // Load players (for player names)
        showLoading('Loading player data...');
        appState.players = await getPlayers();

        appState.loading = false;
        renderAll();

    } catch (error) {
        console.error('Failed to load data:', error);
        appState.error = error.message;
        showError(error.message);
    }
}

async function loadLeagueData(league) {
    const leagueId = league.league_id;

    // Get league details, users, rosters in parallel
    const [leagueInfo, users, rosters] = await Promise.all([
        getLeague(leagueId),
        getLeagueUsers(leagueId),
        getLeagueRosters(leagueId)
    ]);

    // Find current/last week
    const lastWeek = leagueInfo.settings?.last_scored_leg || appState.nflState.week;

    // Get matchups for current week
    const currentMatchups = await getLeagueMatchups(leagueId, lastWeek);

    // Get all weeks for season record
    const allMatchups = {};
    const weekPromises = [];
    for (let week = 1; week <= lastWeek; week++) {
        weekPromises.push(
            getLeagueMatchups(leagueId, week).then(m => {
                allMatchups[week] = m;
            })
        );
    }
    await Promise.all(weekPromises);

    appState.leagueData[leagueId] = {
        league: leagueInfo,
        users,
        rosters,
        currentMatchups,
        allMatchups,
        currentWeek: lastWeek
    };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getMyRoster(leagueId) {
    const data = appState.leagueData[leagueId];
    if (!data) return null;
    return data.rosters.find(r => r.owner_id === appState.user.user_id);
}

function getRosterOwner(leagueId, rosterId) {
    const data = appState.leagueData[leagueId];
    if (!data) return { display_name: 'Unknown', team_name: null };

    const roster = data.rosters.find(r => r.roster_id === rosterId);
    if (!roster) return { display_name: 'Unknown', team_name: null };

    const user = data.users.find(u => u.user_id === roster.owner_id);
    if (!user) return { display_name: 'Unknown', team_name: null };

    return {
        display_name: user.display_name,
        team_name: user.metadata?.team_name || user.display_name
    };
}

function getPlayerName(playerId) {
    if (!appState.players) return playerId;

    // Handle defense (3-letter codes like "PHI", "BUF")
    if (playerId.length <= 3 && isNaN(playerId)) {
        return `${playerId} DEF`;
    }

    const player = appState.players[playerId];
    if (!player) return playerId;

    return `${player.first_name?.[0] || ''}. ${player.last_name || playerId}`;
}

function getPlayerPosition(playerId) {
    if (!appState.players) return '';
    if (playerId.length <= 3 && isNaN(playerId)) return 'DEF';

    const player = appState.players[playerId];
    return player?.position || '';
}

function getOpponentMatchup(matchups, myMatchupId, myRosterId) {
    return matchups.find(m =>
        m.matchup_id === myMatchupId && m.roster_id !== myRosterId
    );
}

// ============================================
// RENDER FUNCTIONS
// ============================================

function showLoading(message) {
    document.getElementById('current-matchups').innerHTML = `
        <div class="loading">${message}</div>
    `;
}

function showError(message) {
    document.getElementById('current-matchups').innerHTML = `
        <div class="error">Error: ${message}</div>
    `;
}

function updateLeagueSelector(leagues) {
    const selector = document.getElementById('league-selector');
    selector.innerHTML = '<option value="all">All Leagues</option>';
    leagues.forEach(league => {
        selector.innerHTML += `<option value="${league.league_id}">${league.name}</option>`;
    });
}

function renderAll() {
    renderCurrentMatchups();
    renderSeasonRecord();
    renderAllTimeRecords();
}

function renderCurrentMatchups() {
    const container = document.getElementById('current-matchups');

    const leagues = appState.selectedLeague === 'all'
        ? appState.leagues
        : appState.leagues.filter(l => l.league_id === appState.selectedLeague);

    let html = '';

    leagues.forEach(league => {
        const leagueId = league.league_id;
        const data = appState.leagueData[leagueId];
        if (!data) return;

        const myRoster = getMyRoster(leagueId);
        if (!myRoster) return;

        const myMatchup = data.currentMatchups.find(m => m.roster_id === myRoster.roster_id);
        if (!myMatchup) return;

        const oppMatchup = getOpponentMatchup(data.currentMatchups, myMatchup.matchup_id, myRoster.roster_id);
        if (!oppMatchup) return;

        const myOwner = getRosterOwner(leagueId, myRoster.roster_id);
        const oppOwner = getRosterOwner(leagueId, oppMatchup.roster_id);

        const myScore = myMatchup.points || 0;
        const oppScore = oppMatchup.points || 0;
        const isWinning = myScore > oppScore;

        html += `
            <div class="matchup-card">
                <div class="league-name">${league.name} - Week ${data.currentWeek}</div>

                <div class="matchup-simple ${appState.currentView === 'detailed' ? 'hidden' : ''}">
                    <div class="team">
                        <span class="team-name">${myOwner.team_name}</span>
                        <span class="team-score ${isWinning ? 'winning' : 'losing'}">${myScore.toFixed(2)}</span>
                    </div>
                    <span class="vs">vs</span>
                    <div class="team">
                        <span class="team-score ${!isWinning ? 'winning' : 'losing'}">${oppScore.toFixed(2)}</span>
                        <span class="team-name">${oppOwner.team_name}</span>
                    </div>
                </div>

                <div class="matchup-detailed ${appState.currentView === 'detailed' ? 'active' : ''}">
                    <div class="roster-grid">
                        <div class="roster-column">
                            <h3>${myOwner.team_name} <span class="total-score ${isWinning ? 'winning' : 'losing'}">${myScore.toFixed(2)}</span></h3>
                            ${renderStartersList(myMatchup)}
                        </div>
                        <div class="roster-column">
                            <h3>${oppOwner.team_name} <span class="total-score ${!isWinning ? 'winning' : 'losing'}">${oppScore.toFixed(2)}</span></h3>
                            ${renderStartersList(oppMatchup)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html || '<div class="no-data">No matchups found</div>';
}

function renderStartersList(matchup) {
    if (!matchup.starters || !matchup.starters_points) return '';

    return matchup.starters.map((playerId, idx) => {
        const points = matchup.starters_points[idx] || 0;
        const pos = getPlayerPosition(playerId);
        const name = getPlayerName(playerId);

        return `
            <div class="player-row">
                <span class="position">${pos}</span>
                <span class="name">${name}</span>
                <span class="points">${points.toFixed(1)}</span>
            </div>
        `;
    }).join('');
}

function renderSeasonRecord() {
    const container = document.getElementById('season-record');

    const leagues = appState.selectedLeague === 'all'
        ? appState.leagues
        : appState.leagues.filter(l => l.league_id === appState.selectedLeague);

    let html = '';

    leagues.forEach(league => {
        const leagueId = league.league_id;
        const data = appState.leagueData[leagueId];
        if (!data) return;

        const myRoster = getMyRoster(leagueId);
        if (!myRoster) return;

        const wins = myRoster.settings?.wins || 0;
        const losses = myRoster.settings?.losses || 0;
        const pointsFor = (myRoster.settings?.fpts || 0) + ((myRoster.settings?.fpts_decimal || 0) / 100);
        const pointsAgainst = (myRoster.settings?.fpts_against || 0) + ((myRoster.settings?.fpts_against_decimal || 0) / 100);

        // Build week-by-week from allMatchups
        const weeks = [];
        for (let week = 1; week <= data.currentWeek; week++) {
            const weekMatchups = data.allMatchups[week];
            if (!weekMatchups) continue;

            const myMatchup = weekMatchups.find(m => m.roster_id === myRoster.roster_id);
            if (!myMatchup) continue;

            const oppMatchup = getOpponentMatchup(weekMatchups, myMatchup.matchup_id, myRoster.roster_id);
            if (!oppMatchup) continue;

            const oppOwner = getRosterOwner(leagueId, oppMatchup.roster_id);
            const myScore = myMatchup.points || 0;
            const oppScore = oppMatchup.points || 0;

            weeks.push({
                week,
                result: myScore > oppScore ? 'W' : 'L',
                score: myScore,
                oppScore: oppScore,
                opponent: oppOwner.team_name
            });
        }

        html += `
            <div class="season-summary">
                <h3>${league.name}</h3>
                <div class="record-display">
                    <div class="record-big">
                        <span class="wins">${wins}</span>-<span class="losses">${losses}</span>
                    </div>
                    <div class="points-summary">
                        PF: ${pointsFor.toFixed(1)} | PA: ${pointsAgainst.toFixed(1)}
                    </div>
                </div>
            </div>
            <div class="matchup-card">
                ${weeks.map(w => `
                    <div class="week-row">
                        <span class="week-num">Week ${w.week}</span>
                        <span class="week-result ${w.result === 'W' ? 'win' : 'loss'}">${w.result}</span>
                        <span class="week-score">${w.score.toFixed(1)} - ${w.oppScore.toFixed(1)}</span>
                        <span class="week-opponent">vs ${w.opponent}</span>
                    </div>
                `).join('')}
            </div>
        `;
    });

    container.innerHTML = html || '<div class="no-data">No season data found</div>';
}

function renderAllTimeRecords() {
    const container = document.getElementById('alltime-records');

    // Aggregate head-to-head records across all leagues
    const h2hRecords = {};

    appState.leagues.forEach(league => {
        const leagueId = league.league_id;
        const data = appState.leagueData[leagueId];
        if (!data) return;

        const myRoster = getMyRoster(leagueId);
        if (!myRoster) return;

        // Go through all weeks
        for (let week = 1; week <= data.currentWeek; week++) {
            const weekMatchups = data.allMatchups[week];
            if (!weekMatchups) continue;

            const myMatchup = weekMatchups.find(m => m.roster_id === myRoster.roster_id);
            if (!myMatchup) continue;

            const oppMatchup = getOpponentMatchup(weekMatchups, myMatchup.matchup_id, myRoster.roster_id);
            if (!oppMatchup) continue;

            const oppOwner = getRosterOwner(leagueId, oppMatchup.roster_id);
            const myScore = myMatchup.points || 0;
            const oppScore = oppMatchup.points || 0;

            const key = oppOwner.display_name;
            if (!h2hRecords[key]) {
                h2hRecords[key] = { wins: 0, losses: 0, leagues: new Set() };
            }

            if (myScore > oppScore) {
                h2hRecords[key].wins++;
            } else {
                h2hRecords[key].losses++;
            }
            h2hRecords[key].leagues.add(league.name);
        }
    });

    // Convert to array and sort
    const records = Object.entries(h2hRecords)
        .map(([opponent, data]) => ({
            opponent,
            wins: data.wins,
            losses: data.losses,
            leagues: Array.from(data.leagues)
        }))
        .sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses));

    let html = records.map(record => {
        const total = record.wins + record.losses;
        const winrate = total > 0 ? ((record.wins / total) * 100).toFixed(0) : 0;

        let statusClass = 'even';
        if (winrate >= 55) statusClass = 'dominating';
        else if (winrate <= 45) statusClass = 'struggling';

        return `
            <div class="rival-card ${statusClass}">
                <div>
                    <div class="rival-name">${record.opponent}</div>
                    <div style="color: #666; font-size: 0.8rem;">${record.leagues.join(', ')}</div>
                </div>
                <div class="rival-record">
                    <span class="record">
                        <span class="wins">${record.wins}</span>-<span class="losses">${record.losses}</span>
                    </span>
                    <span class="winrate">${winrate}%</span>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html || '<div class="no-data">No rivalry data found</div>';
}

// ============================================
// EVENT HANDLERS
// ============================================

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// View toggle (simple/detailed)
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        appState.currentView = btn.dataset.view;
        renderCurrentMatchups();
    });
});

// League selector
document.getElementById('league-selector').addEventListener('change', (e) => {
    appState.selectedLeague = e.target.value;
    renderAll();
});

// ============================================
// INIT
// ============================================

loadAllData();
