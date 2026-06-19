import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import "./ai.css";
import { faArrowRight, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useAskAi } from "../../hooks/useQueries/useAiQueries";
import Loading from "../../utils/Loading";
import { faRobot } from "@fortawesome/free-solid-svg-icons/faRobot";
import type { IAskAiDetailsProps } from "../../types/IAi";


function AskAiDetails({ mode, setDisplay }: IAskAiDetailsProps) {
    const [question, setQuestion] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const { id } = useParams();
    const { mutateAsync, isPending } = useAskAi();


    const handleAiQuestion = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id || isPending || question === "") return;
        setResponse("");
        await mutateAsync(
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
    }


    return (
        <div className="ai-container">
            <div className="ai-response">
                {
                    isPending ? <Loading /> :
                        <p>{response ||
                            "Ask anything about this product's specifications below!"}
                        </p>
                }
                <p className="ai-icon">
                    <FontAwesomeIcon icon={faRobot} />
                </p>
            </div>
            <form className="ai-form" onSubmit={handleAiQuestion}>
                <input
                    required
                    placeholder={isPending ? "Waiting for AI..." : "Ask AI about the product!"}
                    type="text"
                    disabled={isPending}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                    className=""
                    type="submit"
                >
                    <FontAwesomeIcon icon={isPending ? faSpinner : faArrowRight} spin={isPending} />
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