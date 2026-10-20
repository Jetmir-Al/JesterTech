import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus, faMagnifyingGlassMinus, faX } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import "./imageView.css";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";

interface IImageView {
    imageUrl: string;
    alt: string;
    onClose: () => void; 
}

function ImageView({ imageUrl, alt, onClose }: IImageView) {
    const [scale, setScale] = useState<number>(1);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + 0.5, 4)); // Max zoom 4x
    };

    const handleZoomOut = () => {
        setScale((prev) => {
            const newScale = Math.max(prev - 0.5, 1);
            if (newScale === 1) setPosition({ x: 0, y: 0 }); // Reset position when fully zoomed out
            return newScale;
        });
    };

    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || scale === 1) return;
        setPosition({
            x: e.clientX - dragStartRef.current.x,
            y: e.clientY - dragStartRef.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="image-view-container" onClick={onClose}>
            <div className="image-view" onClick={(e) => e.stopPropagation()}>
                <Button className="close-top-btn" type="button" title="Close" onClick={onClose}>
                    <FontAwesomeIcon icon={faX} />
                </Button>

                <div 
                    className="image-viewport"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                >
                    <img 
                        src={imageUrl} 
                        alt={alt} 
                        style={{ 
                            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                        }} 
                    />
                </div>

                <div className="zoom-controls">
                    <Button className="zoom-btn" type="button" title="Zoom In" onClick={handleZoomIn}>
                        <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                    </Button>

                    <Button className="zoom-btn" type="button" title="Zoom Out" onClick={handleZoomOut}>
                        <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
                    </Button>

                    {scale > 1 && (
                        <Button className="zoom-btn reset-btn" type="button" title="Reset Zoom" onClick={handleReset}>
                            <FontAwesomeIcon icon={faBan} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageView;