import styled from "styled-components";

import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlaneIcon = styled.div`
  font-size: 1.7rem;
`;

const LoginIndicator = () => {
  return (
    <div id="loading">
      <PlaneIcon>
        <FontAwesomeIcon icon={faPlane} />
      </PlaneIcon>
      <PlaneIcon>
        <FontAwesomeIcon icon={faPlane} />
      </PlaneIcon>
      <PlaneIcon>
        <FontAwesomeIcon icon={faPlane} />
      </PlaneIcon>
      <PlaneIcon>
        <FontAwesomeIcon icon={faPlane} />
      </PlaneIcon>
      <PlaneIcon>
        <FontAwesomeIcon icon={faPlane} />
      </PlaneIcon>
    </div>
  );
};

export default LoginIndicator;
