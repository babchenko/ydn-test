import {github} from 'app/axios'

const fetchUsers = (username: string) => {
    return github.get('/search/users', {
        params: {
            q: username,
            per_page: 5,
            page: 1
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
