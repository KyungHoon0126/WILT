import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";

function Spinner() {
    const override = css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto;
    `;

    return (
        <PacmanLoader size={50} css={override} color="#F6E835"/>
    )
}

export default Spinner
