import React, { Component } from "react";
import moment from "moment";
import api from "../../services/api";
import logo from "../../assets/logo.png";
import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";

export default class Main extends Component {
    state = {
        loading: false,
        repositoryError: false,
        repositoryInput: "",
        repositories: []
    };

    componentDidMount = () => {
        //window.localStorage.clear(); //limpa o local storage
        if (typeof Storage !== "undefined") {
            // Code for localStorage/sessionStorage.
            if (window.localStorage.repositories) {
                // JSON.parse -> converte um string json para um objeto
                const repositories = JSON.parse(
                    window.localStorage.getItem("repositories")
                );
                this.setState({ repositories });
            }
        }
    };

    handleAddRepository = async e => {
        e.preventDefault(); // impede a pagina de recarregar
        this.setState({ loading: true });
        try {
            const { data: repository } = await api.get(
                `/repos/${this.state.repositoryInput}`
            );

            if (
                !this.state.repositories.find(repo => repo.id === repository.id)
            ) {
                repository.lastCommit = moment(repository.pushed_at).fromNow();

                this.setState(
                    {
                        repositories: [...this.state.repositories, repository],
                        repositoryInput: "",
                        repositoryError: false
                    },
                    () => {
                        if (typeof Storage !== "undefined") {
                            // Code for localStorage/sessionStorage.
                            window.localStorage.setItem(
                                "repositories",
                                JSON.stringify(this.state.repositories)
                            );
                        }
                    }
                );
            } else {
                this.setState({ repositoryInput: "" });
            }
        } catch (err) {
            this.setState({ repositoryError: true });
        } finally {
            this.setState({ loading: false });
        }
    };

    handleRemoveRepository = async id => {
        const { repositories } = this.state;
        const updatedRepositories = repositories.filter(repo => repo.id !== id);
        this.setState({ repositories: updatedRepositories });
        await window.localStorage.setItem(
            "repositories",
            JSON.stringify(updatedRepositories) // converte para uma string json
        );
    };

    handleUpdateRepository = async id => {
        try {
            const repo = this.state.repositories.find(repo => repo.id === id);
            const { data: repository } = await api.get(
                `/repos/${repo.owner.login}/${repo.name}`
            );
            let index = this.state.repositories.findIndex(
                repo => repo.id === repository.id
            );
            if (index !== -1) {
                let { repositories } = this.state;
                repository.lastCommit = moment(repository.pushed_at).fromNow();
                repositories[index] = repository;
                this.setState({ repositories });
                await window.localStorage.setItem(
                    "repositories",
                    JSON.stringify(repositories)
                );
            }
        } catch (err) {}
    };

    render() {
        return (
            <Container>
                <img src={logo} alt="Github Compare" />
                <Form
                    withError={this.state.repositoryError}
                    onSubmit={this.handleAddRepository}
                >
                    <input
                        value={this.state.repositoryInput}
                        onChange={e =>
                            this.setState({ repositoryInput: e.target.value })
                        }
                        type="text"
                        placeholder="usuário/repositório"
                    />
                    <button type="submit">
                        {this.state.loading ? (
                            <i className="fa fa-spinner fa-pulse" />
                        ) : (
                            "OK"
                        )}
                    </button>
                </Form>
                <CompareList
                    repositories={this.state.repositories}
                    handleRemoveRepository={this.handleRemoveRepository}
                    handleUpdateRepository={this.handleUpdateRepository}
                />
            </Container>
        );
    }
}
