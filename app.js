// ============================================
// MOCK DATA - Replace with Sleeper API calls
// ============================================

const mockData = {
    leagues: [
        { id: 'league1', name: 'Dynasty Bros' },
        { id: 'league2', name: 'Work League' },
        { id: 'league3', name: 'College Friends' }
    ],

    currentWeek: 14,

    // Current matchups by league
    currentMatchups: {
        league1: {
            myTeam: 'Mahomes & Dreams',
            myScore: 142.5,
            opponent: 'CMC Express',
            oppScore: 128.3,
            myRoster: [
                { pos: 'QB', name: 'P. Mahomes', points: 24.5 },
                { pos: 'RB', name: 'B. Robinson', points: 18.2 },
                { pos: 'RB', name: 'J. Jacobs', points: 14.8 },
                { pos: 'WR', name: 'J. Chase', points: 22.1 },
                { pos: 'WR', name: 'A. Brown', points: 16.4 },
                { pos: 'TE', name: 'T. Kelce', points: 12.3 },
                { pos: 'FLEX', name: 'D. London', points: 19.2 },
                { pos: 'K', name: 'H. Butker', points: 8.0 },
                { pos: 'DEF', name: 'Cowboys', points: 7.0 }
            ],
            oppRoster: [
                { pos: 'QB', name: 'J. Allen', points: 21.2 },
                { pos: 'RB', name: 'C. McCaffrey', points: 24.5 },
                { pos: 'RB', name: 'T. Pollard', points: 11.3 },
                { pos: 'WR', name: 'T. Hill', points: 18.6 },
                { pos: 'WR', name: 'D. Adams', points: 14.2 },
                { pos: 'TE', name: 'D. Goedert', points: 8.4 },
                { pos: 'FLEX', name: 'J. Addison', points: 12.1 },
                { pos: 'K', name: 'J. Tucker', points: 11.0 },
                { pos: 'DEF', name: 'Browns', points: 7.0 }
            ]
        },
        league2: {
            myTeam: 'Office Champions',
            myScore: 98.4,
            opponent: 'HR Nightmare',
            oppScore: 112.7,
            myRoster: [
                { pos: 'QB', name: 'L. Jackson', points: 19.8 },
                { pos: 'RB', name: 'A. Ekeler', points: 8.2 },
                { pos: 'RB', name: 'R. Stevenson', points: 12.4 },
                { pos: 'WR', name: 'S. Diggs', points: 11.3 },
                { pos: 'WR', name: 'C. Olave', points: 14.6 },
                { pos: 'TE', name: 'D. Waller', points: 6.2 },
                { pos: 'FLEX', name: 'T. Etienne', points: 10.9 },
                { pos: 'K', name: 'T. Bass', points: 7.0 },
                { pos: 'DEF', name: 'Ravens', points: 8.0 }
            ],
            oppRoster: [
                { pos: 'QB', name: 'J. Hurts', points: 26.4 },
                { pos: 'RB', name: 'S. Barkley', points: 21.2 },
                { pos: 'RB', name: 'D. Swift', points: 13.8 },
                { pos: 'WR', name: 'A. St. Brown', points: 15.4 },
                { pos: 'WR', name: 'G. Wilson', points: 9.2 },
                { pos: 'TE', name: 'M. Andrews', points: 8.7 },
                { pos: 'FLEX', name: 'D. Moore', points: 6.0 },
                { pos: 'K', name: 'B. McManus', points: 5.0 },
                { pos: 'DEF', name: 'Eagles', points: 7.0 }
            ]
        },
        league3: {
            myTeam: 'Dorm Room Dynasty',
            myScore: 156.2,
            opponent: 'Beer Pong Champs',
            oppScore: 134.8,
            myRoster: [
                { pos: 'QB', name: 'J. Burrow', points: 28.4 },
                { pos: 'RB', name: 'A. Kamara', points: 22.1 },
                { pos: 'RB', name: 'N. Chubb', points: 16.8 },
                { pos: 'WR', name: 'J. Jefferson', points: 31.2 },
                { pos: 'WR', name: 'D. Samuel', points: 18.4 },
                { pos: 'TE', name: 'S. LaPorta', points: 14.2 },
                { pos: 'FLEX', name: 'C. Lamb', points: 12.1 },
                { pos: 'K', name: 'J. Elliott', points: 6.0 },
                { pos: 'DEF', name: '49ers', points: 7.0 }
            ],
            oppRoster: [
                { pos: 'QB', name: 'T. Lawrence', points: 18.2 },
                { pos: 'RB', name: 'J. Taylor', points: 19.4 },
                { pos: 'RB', name: 'D. Henry', points: 22.8 },
                { pos: 'WR', name: 'M. Evans', points: 16.2 },
                { pos: 'WR', name: 'K. Allen', points: 14.4 },
                { pos: 'TE', name: 'P. Freiermuth', points: 7.8 },
                { pos: 'FLEX', name: 'C. Kirk', points: 18.0 },
                { pos: 'K', name: 'C. Boswell', points: 9.0 },
                { pos: 'DEF', name: 'Jets', points: 9.0 }
            ]
        }
    },

    // Season records by league
    seasonRecords: {
        league1: {
            wins: 10,
            losses: 3,
            pointsFor: 1842.5,
            pointsAgainst: 1654.2,
            weeks: [
                { week: 1, result: 'W', score: 145.2, oppScore: 128.4, opponent: 'Team Burrow' },
                { week: 2, result: 'W', score: 138.6, oppScore: 122.1, opponent: 'Kelce Connection' },
                { week: 3, result: 'L', score: 112.4, oppScore: 156.8, opponent: 'CMC Express' },
                { week: 4, result: 'W', score: 156.2, oppScore: 134.5, opponent: 'Hurts So Good' },
                { week: 5, result: 'W', score: 142.8, oppScore: 118.2, opponent: 'Tank for Tucker' },
                { week: 6, result: 'W', score: 128.4, oppScore: 124.6, opponent: 'Jefferson Airplane' },
                { week: 7, result: 'L', score: 98.2, oppScore: 142.8, opponent: 'Allen Wrenches' },
                { week: 8, result: 'W', score: 162.4, oppScore: 128.9, opponent: 'Chubb Hub' },
                { week: 9, result: 'W', score: 134.6, oppScore: 112.4, opponent: 'Team Burrow' },
                { week: 10, result: 'W', score: 148.2, oppScore: 138.6, opponent: 'Kelce Connection' },
                { week: 11, result: 'L', score: 118.4, oppScore: 132.8, opponent: 'CMC Express' },
                { week: 12, result: 'W', score: 152.6, oppScore: 128.4, opponent: 'Hurts So Good' },
                { week: 13, result: 'W', score: 146.8, oppScore: 108.2, opponent: 'Tank for Tucker' }
            ]
        },
        league2: {
            wins: 7,
            losses: 6,
            pointsFor: 1524.8,
            pointsAgainst: 1542.6,
            weeks: [
                { week: 1, result: 'L', score: 108.4, oppScore: 124.6, opponent: 'Boss Mode' },
                { week: 2, result: 'W', score: 132.4, oppScore: 118.2, opponent: 'HR Nightmare' },
                { week: 3, result: 'W', score: 118.6, oppScore: 98.4, opponent: 'IT Crowd' },
                { week: 4, result: 'L', score: 102.8, oppScore: 142.6, opponent: 'Marketing Mavens' },
                { week: 5, result: 'W', score: 124.2, oppScore: 112.8, opponent: 'Sales Force' },
                { week: 6, result: 'W', score: 138.4, oppScore: 124.2, opponent: 'Accounting Aces' },
                { week: 7, result: 'L', score: 96.8, oppScore: 128.4, opponent: 'Boss Mode' },
                { week: 8, result: 'W', score: 142.6, oppScore: 116.8, opponent: 'HR Nightmare' },
                { week: 9, result: 'L', score: 108.2, oppScore: 124.6, opponent: 'IT Crowd' },
                { week: 10, result: 'W', score: 128.4, oppScore: 118.2, opponent: 'Marketing Mavens' },
                { week: 11, result: 'L', score: 112.6, oppScore: 138.4, opponent: 'Sales Force' },
                { week: 12, result: 'W', score: 118.8, oppScore: 102.4, opponent: 'Accounting Aces' },
                { week: 13, result: 'L', score: 92.6, oppScore: 134.8, opponent: 'Boss Mode' }
            ]
        },
        league3: {
            wins: 9,
            losses: 4,
            pointsFor: 1728.4,
            pointsAgainst: 1586.2,
            weeks: [
                { week: 1, result: 'W', score: 142.6, oppScore: 118.4, opponent: 'Frat House' },
                { week: 2, result: 'W', score: 156.8, oppScore: 132.2, opponent: 'Beer Pong Champs' },
                { week: 3, result: 'W', score: 128.4, oppScore: 112.6, opponent: 'Study Hall' },
                { week: 4, result: 'L', score: 108.2, oppScore: 148.4, opponent: 'Ramen Noodles' },
                { week: 5, result: 'W', score: 138.6, oppScore: 124.8, opponent: 'Late Night Crew' },
                { week: 6, result: 'W', score: 152.4, oppScore: 128.6, opponent: 'Frat House' },
                { week: 7, result: 'L', score: 118.2, oppScore: 142.4, opponent: 'Beer Pong Champs' },
                { week: 8, result: 'W', score: 146.8, oppScore: 112.8, opponent: 'Study Hall' },
                { week: 9, result: 'W', score: 134.2, oppScore: 128.4, opponent: 'Ramen Noodles' },
                { week: 10, result: 'L', score: 112.4, oppScore: 138.6, opponent: 'Late Night Crew' },
                { week: 11, result: 'W', score: 158.4, oppScore: 124.2, opponent: 'Frat House' },
                { week: 12, result: 'L', score: 98.6, oppScore: 132.8, opponent: 'Beer Pong Champs' },
                { week: 13, result: 'W', score: 132.8, oppScore: 122.4, opponent: 'Study Hall' }
            ]
        }
    },

    // All-time head-to-head records
    allTimeRecords: [
        { opponent: 'CMC Express', wins: 8, losses: 12, leagues: ['Dynasty Bros'] },
        { opponent: 'Beer Pong Champs', wins: 14, losses: 10, leagues: ['College Friends'] },
        { opponent: 'Boss Mode', wins: 6, losses: 14, leagues: ['Work League'] },
        { opponent: 'Team Burrow', wins: 11, losses: 7, leagues: ['Dynasty Bros'] },
        { opponent: 'Frat House', wins: 16, losses: 8, leagues: ['College Friends'] },
        { opponent: 'HR Nightmare', wins: 10, losses: 10, leagues: ['Work League'] },
        { opponent: 'Kelce Connection', wins: 12, losses: 6, leagues: ['Dynasty Bros'] },
        { opponent: 'IT Crowd', wins: 8, losses: 8, leagues: ['Work League'] },
        { opponent: 'Study Hall', wins: 18, losses: 4, leagues: ['College Friends'] }
    ]
};

// ============================================
// APP STATE
// ============================================

let currentView = 'simple'; // 'simple' or 'detailed'
let selectedLeague = 'all';

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderCurrentMatchups() {
    const container = document.getElementById('current-matchups');
    const leagues = selectedLeague === 'all'
        ? mockData.leagues
        : mockData.leagues.filter(l => l.id === selectedLeague);

    let html = '';

    leagues.forEach(league => {
        const matchup = mockData.currentMatchups[league.id];
        if (!matchup) return;

        const isWinning = matchup.myScore > matchup.oppScore;

        html += `
            <div class="matchup-card">
                <div class="league-name">${league.name} - Week ${mockData.currentWeek}</div>

                <div class="matchup-simple ${currentView === 'detailed' ? 'hidden' : ''}">
                    <div class="team">
                        <span class="team-name">${matchup.myTeam}</span>
                        <span class="team-score ${isWinning ? 'winning' : 'losing'}">${matchup.myScore}</span>
                    </div>
                    <span class="vs">vs</span>
                    <div class="team">
                        <span class="team-score ${!isWinning ? 'winning' : 'losing'}">${matchup.oppScore}</span>
                        <span class="team-name">${matchup.opponent}</span>
                    </div>
                </div>

                <div class="matchup-detailed ${currentView === 'detailed' ? 'active' : ''}">
                    <div class="roster-grid">
                        <div class="roster-column">
                            <h3>${matchup.myTeam} <span class="total-score ${isWinning ? 'winning' : 'losing'}">${matchup.myScore}</span></h3>
                            ${matchup.myRoster.map(p => `
                                <div class="player-row">
                                    <span class="position">${p.pos}</span>
                                    <span class="name">${p.name}</span>
                                    <span class="points">${p.points}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="roster-column">
                            <h3>${matchup.opponent} <span class="total-score ${!isWinning ? 'winning' : 'losing'}">${matchup.oppScore}</span></h3>
                            ${matchup.oppRoster.map(p => `
                                <div class="player-row">
                                    <span class="position">${p.pos}</span>
                                    <span class="name">${p.name}</span>
                                    <span class="points">${p.points}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderSeasonRecord() {
    const container = document.getElementById('season-record');
    const leagues = selectedLeague === 'all'
        ? mockData.leagues
        : mockData.leagues.filter(l => l.id === selectedLeague);

    let html = '';

    leagues.forEach(league => {
        const record = mockData.seasonRecords[league.id];
        if (!record) return;

        html += `
            <div class="season-summary">
                <h3>${league.name}</h3>
                <div class="record-display">
                    <div class="record-big">
                        <span class="wins">${record.wins}</span>-<span class="losses">${record.losses}</span>
                    </div>
                    <div class="points-summary">
                        PF: ${record.pointsFor.toFixed(1)} | PA: ${record.pointsAgainst.toFixed(1)}
                    </div>
                </div>
            </div>
            <div class="matchup-card">
                ${record.weeks.map(w => `
                    <div class="week-row">
                        <span class="week-num">Week ${w.week}</span>
                        <span class="week-result ${w.result === 'W' ? 'win' : 'loss'}">${w.result}</span>
                        <span class="week-score">${w.score} - ${w.oppScore}</span>
                        <span class="week-opponent">vs ${w.opponent}</span>
                    </div>
                `).join('')}
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderAllTimeRecords() {
    const container = document.getElementById('alltime-records');

    // Sort by total games played
    const sorted = [...mockData.allTimeRecords].sort((a, b) =>
        (b.wins + b.losses) - (a.wins + a.losses)
    );

    let html = sorted.map(record => {
        const total = record.wins + record.losses;
        const winrate = ((record.wins / total) * 100).toFixed(0);

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

    container.innerHTML = html;
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
        currentView = btn.dataset.view;
        renderCurrentMatchups();
    });
});

// League selector
document.getElementById('league-selector').addEventListener('change', (e) => {
    selectedLeague = e.target.value;
    renderCurrentMatchups();
    renderSeasonRecord();
});

// ============================================
// INIT
// ============================================

function init() {
    renderCurrentMatchups();
    renderSeasonRecord();
    renderAllTimeRecords();
}

init();
