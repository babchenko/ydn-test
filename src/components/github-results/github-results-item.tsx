import {FC} from 'react';
import {Accordion} from 'react-bootstrap';
import GithubResultRepos from 'components/github-results/github-results-repos';
import {GithubUser} from 'features/github-search/GithubInterface';
import {useAppSelector, useAppDispatch} from 'app/hooks';
import {selectRepos, fetchReposAction} from 'features/github-search/githubRepoSlice';

interface Props {
    user: GithubUser
}

const GithubResultsItem: FC<Props> = ({user}) => {
    const repos = useAppSelector(selectRepos);
    const dispatch = useAppDispatch();


    const loadUserRepos = () => {
        if (!repos[user.login]) {
            dispatch(fetchReposAction(user.login))
        }
    }

    return (
        <Accordion.Item eventKey={user.login}>
            <Accordion.Header onClick={loadUserRepos}>{user.login}</Accordion.Header>
            <Accordion.Body>
                <GithubResultRepos repos={repos[user.login]}/>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default GithubResultsItem;
