import { github } from '../../app/axios'

const fetchUsers = (username: string)  => {
    return github.get('/search/users', {
        params: {
            q: username
        },
    });
}

const fetchRepos = (username: string) => {
    return github.get(`/users/${username}/repos`)
}

export {
    fetchUsers,
    fetchRepos
}
