import {FC} from 'react';
import GithubResultRepos from './github-results-repos';
import {Accordion} from "react-bootstrap";
import {GithubUser} from "../../features/github-search/GithubInterface";
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {selectRepos, fetchReposAction} from "../../features/github-search/githubSearchSlice";

interface Props {
    user: GithubUser
}

const GithubResultsItem: FC<Props> = ({ user }) => {
    const repos = useAppSelector(selectRepos);
    const dispatch = useAppDispatch();


    const loadUserRepos = () => {
        if (!repos[user.login]) {
            dispatch(fetchReposAction(user.login))
        }
    }

    return (
        <Accordion.Item eventKey={user.login}>
            <Accordion.Header onClick={loadUserRepos}>{ user.login }</Accordion.Header>
            <Accordion.Body>
                <GithubResultRepos repos={repos[user.login]} />
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default GithubResultsItem;
