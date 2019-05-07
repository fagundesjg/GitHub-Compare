import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-top: 50px;
`;

export const Repository = styled.div`
    width: 250px;
    background: #fff;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    header {
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;

        strong {
            font-size: 24px;
            margin-top: 10px;
        }

        small {
            font-size: 14px;
            color: #666;
        }

        img {
            width: 64px;
        }
    }

    ul {
        list-style: none;

        li {
            font-weight: bold;
            padding: 12px 20px;

            small {
                font-weight: normal;
                font-size: 12px;
                color: #999;
                font-style: italic;
            }

            &:nth-child(2n - 1) {
                background: #f5f5f5;
            }
        }
    }

    .button-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 5px 0 10px 0;
        button {
            width: 40px;
            border: 0;
            background: #fff;

            &:hover {
                cursor: pointer;
                i {
                    color: #ccc;
                }
            }
        }
    }
`;
