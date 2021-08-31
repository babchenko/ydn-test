import React, {FC} from 'react'
import {Accordion, Figure, Spinner} from 'react-bootstrap'
import GithubResultsItem from 'components/github-results/github-results-item';
import {GithubUser} from 'features/github-search/GithubInterface';
import {useAppSelector} from 'app/hooks';
import {selectUserStatus} from 'features/github-search/githubUserSlice';

interface Props {
    users: GithubUser[];
}

const GithubResultsList: FC<Props> = ({users}) => {

    const loading = useAppSelector(selectUserStatus);

    if (loading === 'loading') {
        return (
            <div className='spinner'>
                <Spinner animation='border'/>
            </div>
        )
    }

    if (!users.length) {
        return (
            <Figure>
                <Figure.Caption>
                    No results
                </Figure.Caption>
            </Figure>
        )
    }

    return (
        <div className='mg--top-20'>
            <Accordion flush={true}>
                {users.map((user) => <GithubResultsItem user={user} key={user.login}/>)}
            </Accordion>
        </div>
    )
}

export default GithubResultsList;
