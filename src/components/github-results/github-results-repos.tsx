import React, {FC} from 'react';
import {ListGroup, Figure, Spinner, Row, Col} from 'react-bootstrap'
import { Star } from 'react-github-buttons';
import {GithubRepo} from '../../features/github-search/GithubInterface';
import {useAppSelector} from '../../app/hooks';
import {selectRepoStatus} from '../../features/github-search/githubSearchSlice';

interface Props {
    repos: GithubRepo[]
}

const GithubResultsRepos: FC<Props> = ({ repos }) => {

    const loading = useAppSelector(selectRepoStatus);

    if (loading === 'loading') {
        return (
            <div className='spinner'>
                <Spinner animation='border' />
            </div>
        )
    }

    if (repos && repos.length) {
        return (
            <ListGroup>
                { repos.map((repo) => {
                    return (
                        <ListGroup.Item key={repo.id}>
                            <Row>
                                <Col xs={12} md={10}>
                                    { repo.name }
                                </Col>
                                <Col xs={12} md={2}>
                                    <div style={{ float: 'right' }}>
                                        <Star owner={repo.owner.login} repo={repo.name}  />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Figure>
                                        <Figure.Caption>
                                            { repo.description }
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                }) }
            </ListGroup>
        )
    } else {
        return (
            <ListGroup>
                <ListGroup.Item>
                    User has no repos.
                </ListGroup.Item>
            </ListGroup>
        )
    }
}

export default GithubResultsRepos;



