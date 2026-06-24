import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import "./ai.css";
import { faArrowRight, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useAskAi, useAskAiGeneral } from "../../hooks/useQueries/useAiQueries";
import Loading from "../../utils/Loading";
import { faRobot } from "@fortawesome/free-solid-svg-icons/faRobot";
import type { IAskAiDetailsProps } from "../../types/IAi";


function AskAiDetails({ mode, setDisplay }: IAskAiDetailsProps) {
    const [question, setQuestion] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const { id } = useParams();
    const { mutateAsync: askDetails, isPending } = useAskAi();
    const { mutateAsync: askGeneral, isPending: pendingGeneral } = useAskAiGeneral();


    const handleAiQuestion = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse("");
        if (mode === "details") {
            if (!id || isPending || question === "") return;

            await askDetails(
                { productId: Number(id), userQuestion: question },
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
                { userQuestion: question },
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
        <div className="ai-container">
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
                <input
                    required
                    placeholder={isPending || pendingGeneral ? "Waiting for AI..." : "Ask AI about the product!"}
                    type="text"
                    disabled={isPending || pendingGeneral}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                    className=""
                    type="submit"
                >
                    <FontAwesomeIcon icon={isPending || pendingGeneral ? faSpinner : faArrowRight} spin={isPending} />
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