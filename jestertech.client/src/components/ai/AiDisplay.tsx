import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import "./ai.css";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AskAiDetails from "./AskAiDetails";
import type { IDisplayAi } from "../../types/IAi";

function AiDisplay({ mode }: IDisplayAi) {
    const [displayAi, setDisplayAi] = useState<boolean>(false);
    return (
        <div className="aiDisplay-container">
            {
                displayAi ?
                    <AskAiDetails
                        mode={mode}
                        setDisplay={() => setDisplayAi(false)}
                        ids={[]}
                    />
                    :
                    <Button
                        className=""
                        type="button"
                        onClick={() => setDisplayAi(true)}>
                        <FontAwesomeIcon icon={faRobot} />
                    </Button>
            }
        </div>
    );
}

export default AiDisplay;