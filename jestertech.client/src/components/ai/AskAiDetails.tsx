import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import "./ai.css";
import { faArrowRight, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useAskAi, useAskAiGeneral, useAskAiPurchases } from "../../hooks/useQueries/useAiQueries";
import Loading from "../../utils/Loading";
import { faRobot } from "@fortawesome/free-solid-svg-icons/faRobot";
import type { IAskAiDetailsProps } from "../../types/IAi";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";


function AskAiDetails({ mode, setDisplay }: IAskAiDetailsProps) {
    const [question, setQuestion] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [displaySettings, setDisplaySettings] = useState<boolean>(false);
    const [preference, setPreference] = useState<"Short answer!" | "Detailed answer!">("Short answer!");
    const { id } = useParams();
    const { mutateAsync: askDetails, isPending } = useAskAi();
    const { mutateAsync: askGeneral, isPending: pendingGeneral } = useAskAiGeneral();
    const { mutateAsync: askPurchases, isPending: pendingPurchases } = useAskAiPurchases();


    const handleAiQuestion = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse("");
        setDisplaySettings(false);
        if (mode === "details") {
            if (!id || isPending || question === "") return;

            await askDetails(
                { productId: Number(id), userQuestion: question, preference },
                {
                    onSuccess: (data) => {
                        if (data && data.answer) {
                            setResponse(data.answer);
                            setQuestion("");
                            
                        }
                    },
                    onError: () => {
                        setResponse("No answer as of this moment. Try later!");
                    }
                }
            );
        } else if (mode === "general") {
            if (pendingGeneral || question === "") return;

            await askGeneral(
                { userQuestion: question, preference },
                {
                    onSuccess: (data) => {
                        if (data && data.answer) {
                            setResponse(data.answer);
                            setQuestion("");
                        }
                    },
                    onError: () => {
                        setResponse("No answer as of this moment. Try later!");
                    }
                }
            );
        } else if (mode === "purchases") {
            if (pendingPurchases || question === "") return;
            await askPurchases(
                { userQuestion: question, preference },
                {
                    onSuccess: (data) => {
                        if (data && data.answer) {
                            setResponse(data.answer);
                            setQuestion("");
                        }
                    },
                    onError: () => {
                        setResponse("No answer as of this moment. Try later!");
                    }
                }
            );
        }
        else {
            return;
        }
    }



    return (
        <div className={`ai-container ${mode}`}>
            <div className="ai-response">
                {
                    isPending || pendingGeneral ? <Loading /> :
                        <p>{response ||
                            "Ask anything about product's specifications!"}
                        </p>
                }
                <p className="ai-icon">
                    <FontAwesomeIcon icon={faRobot} />
                </p>
            </div>
            <form className="ai-form" onSubmit={handleAiQuestion}>
                <Button
                    type="button"
                    className="toggleAiPreference"
                    onClick={() => setDisplaySettings(e => !e)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </Button>
                {
                    displaySettings && (
                        <div className="ai-settings">
                            <label htmlFor="short-answer">
                            Short answer!
                            <input type="radio"
                                    name="preference"
                                    id="short-answer"
                                value="Short answer!"
                                checked={preference === "Short answer!"}
                                onChange={() => setPreference("Short answer!")} />
                            </label>
                            <label htmlFor="detailed-answer">
                            Detailed answer!
                            <input type="radio"
                                name="preference"
                                id="detailed-answer"
                                value="Detailed answer!"
                                checked={preference === "Detailed answer!"}
                                onChange={() => setPreference("Detailed answer!")} />
                            </label>
                        </div>
                    )
                }
                <input
                    required
                    placeholder={isPending || pendingGeneral || pendingPurchases ? "Waiting for AI..." : "Ask AI about the product!"}
                    type="text"
                    disabled={isPending || pendingGeneral || pendingPurchases}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                    className="aiSubmitBtn"
                    type="submit"
                >
                    <FontAwesomeIcon icon={isPending || pendingGeneral || pendingPurchases ? faSpinner : faArrowRight} spin={isPending} />
                </Button>
            </form>
            <FontAwesomeIcon
                icon={faXmark}
                className="ri-close-line closeAi"
                onClick={() => setDisplay()}
            />
        </div>
    );
}

export default AskAiDetails;