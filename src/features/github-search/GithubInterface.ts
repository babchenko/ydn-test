export interface GithubUser {
    id: number
    login: string
}

export interface GithubRepo {
    id: number;
    name: string;
    description: null | string;
    stargazers_count: number;
    owner: GithubUser;
}

export type GithubRepoResponse = {
    [key: string]: GithubRepo[]
}
