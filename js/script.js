const ApiKey = "f7a3f07975494d02b0842b4d4b219a90";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                    </p>
                    <a href="#tim" data-id="${team.id}" class="secondary-content"><i class="material-icons" data-id="${team.id}">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>';
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn => {
                btn.onclick = (event) => {
                    tim(event.target.dataset.id)
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function tim(id) {
    title.innerHTML = "DETAIL";
    let databaru = baseUrl + "teams/" + id

    fetch(databaru, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.squad)
            let teams = "";
            let n = 1;
            let Gambar = resJson.crestUrl;
            let Nama = resJson.name;
            let alamat = resJson.address;
            let kontak = resJson.phone;
            let remail = resJson.email;
            let taun = resJson.founded;
            resJson.squad.forEach(inputan => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${n}.</td>
                    <td>${inputan.name}</td>
                    <td>${inputan.position}</td>
                    <td>${inputan.countryOfBirth}</td>
                </tr>
                `;
                n++;
            })
            contents.innerHTML = `
                <div class="card">
                    <div class="row" style="padding-top:10px;">
                        <div class="col s3">
                           <img src="${Gambar}">
                        </div>
                        <div class="col s9">
                            <h4><b><center>${Nama}</center></b></h4>
                           <p align ="justify"> <span>Berdiri      : Sejak Tahun ${taun}</span><br>
                            <span>Kontak       : ${kontak}</span><br>
                            <span>Email        : ${remail}</span><br>
                            <span>Alamat       : ${alamat}</span><br>
                           </p> </div>
                    </div>
                </div>
                <center><h5><b>DAFTAR PEMAIN</h5></center></b>
                <div class="card">
                    <table class="centered responsive-table">
                        <thead>
                            <th> No.</th>
                            <th> Nama Pemain</th>
                            <th> Posisi</th>
                            <th> Tempat Tinggal</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        })
}


function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;
            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
        
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});