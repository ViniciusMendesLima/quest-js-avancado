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

async function user(userName){
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

async function repos(userName){
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    return await response.json()
}

async function events(userName){
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const response = await fetch(`https://api.github.com/users/${userName}/events`, {
        headers: {
            Authorization: `token ${token}`
        }
    })
    return await response.json()
}

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

        getUserRepositories(userName)
        getUserEvents(userName)
    })
}

function getUserRepositories(userName){
    repos(userName).then(reposData =>{
        let repositoriesItens = ""

        console.log(reposData);
        
        
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

 

