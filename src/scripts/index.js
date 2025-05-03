import { user } from "/src/scripts/services/user.js"
import { repositories } from "/src/scripts/services/repositories.js"
import { events } from "/src/scripts/services/events.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        getUserProfile(userName)
    }
})

function getUserProfile(userName){
    user(userName).then(userData=>{
        let userInfo= `
        <div class="info">
            <img src='${userData.avatar_url}' alt='Foto do perfil do usuário'/>
            <div class="data">
                <h1>${userData.name ?? 'Não possui nome cadastrado 😢'}</h1>
                <h2>${userData.login}</h2>
                <p>${userData.bio ?? 'Não possui bio cadastrado 😢'}</p>
                <p>Followers: ${userData.followers}</p>
                <p>Following: ${userData.following}</p>
            </div>
        </div>`


        document.querySelector('.profile-data').innerHTML = userInfo

        getUserEvents(userName)
        getUserRepositories(userName)
    })
}

function getUserRepositories(userName){
    repositories(userName).then(reposData =>{
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `
                                <li>
                                    <a href="${repo.html_url}" target="_blank">
                                        ${repo.name}
                                        <div class="repoInfo">
                                        <p>🍴 ${repo.forks_count}</p>
                                        <p>⭐ ${repo.stargazers_count}</p>
                                        <p>👀 ${repo.watchers_count}</p>
                                        <p>🧑‍💻 ${repo.language ?? ' 🙅'}</p>
                                    </div>
                                    </a>
                                </li>`
        })
        
        document.querySelector('.profile-data').innerHTML += 
        `<div class="repositories section">
            <h2>Repositòrios</h2>
            <ul>${repositoriesItens}</ul>
        </div>`
    })
}

function getUserEvents(userName){
    events(userName).then(eventsData => {
        let eventiesItens= ""
        eventsData.forEach(type => {
            let message
            if (type.type === "PushEvent") {
                message = type.payload.commits[0].message || 'Sem mensagem de commit';
            } else {
                message = "Sem mensagem de commit"
            }
            
            eventiesItens += `<li><p class="repoName">${type.repo.name}</p><p>- ${message}</p></li>`
        })
        document.querySelector('.profile-data').innerHTML += `
        <div class="events">
            <h2>Eventos</h2>
            <ul>${eventiesItens}</ul>
        </div>`
    })
}

 

