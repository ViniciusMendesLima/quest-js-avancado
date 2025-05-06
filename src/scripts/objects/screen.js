const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `
                <div class="info">
                    <img src='${user.avatarUrl}' alt='Foto do perfil do usuário'/>
                    <div class="data">
                        <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                        <h3>${user.userName}</h3>
                        <p>${user.bio ?? 'Não possui bio cadastrado 😢'}</p>
                        <div class="follow">
                            <p>Followers: ${user.followers}</p>
                            <p>Following: ${user.following}</p>
                        </div>
                    </div>
                </div>`
        
                let eventsItens= ""
                const eventMessage= "Sem mensagem de commit"
                user.events.forEach(element => {
                    console.log(user.events);
                    
                    if (element.type === "PushEvent") {
                        eventsItens+= `<li>
                        <h3>${element.repo.name}</h3>
                        <p> -- ${element.payload.commits[0].message}</p>
                        </li>`
                    } else {
                        eventsItens+= `<li>
                        <h3>${element.repo.name}</h3>
                        <p> -- ${eventMessage}</p>
                        </li>`
                    }
                })
                
                
                if (user.events.length > 0) {
                    this.userProfile.innerHTML +=`
                        <div class="events">
                            <h2>Eventos</h2>
                            <ul>${eventsItens}</ul>
                        </div>`
                }

                let repositoriesItens = ''
                user.repositories.forEach(repo => repositoriesItens += `
                        <li>
                            <a href="${repo.html_url}" target="_blank">
                                ${repo.name}
                                <div class="repoInfo">
                                    <p>🍴 ${repo.forks_count}</p>
                                    <p>⭐ ${repo.stargazers_count}</p>
                                    <p>👀 ${repo.watchers_count}</p>
                                    <p>🧑‍💻 ${repo.language ?? ' 🚫 Not specified'}</p>
                                </div>
                            </a>
                        </li>`)

                if(user.repositories.length > 0){
                    this.userProfile.innerHTML += `
                        <div class="repositories section">
                            <h2>Repositórios</h2>
                            <ul>${repositoriesItens}</ul>
                        </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export {screen}