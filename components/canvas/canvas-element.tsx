"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import type { CanvasElement } from "@/types/canvas";
import { cn } from "@/lib/utils";
import { ResizeHandle } from "./resize-handle";
import { ResizeOverlay } from "./resize-overlay";
import { SizeIndicator } from "./size-indicator";

interface CanvasElementProps {
	element: CanvasElement;
	onUpdate: (updates: Partial<CanvasElement>) => void;
}

export function CanvasElementComponent({
	element,
	onUpdate,
}: CanvasElementProps) {
	const elementRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isResizing, setIsResizing] = useState(false);
	const [resizeDirection, setResizeDirection] = useState<string | null>(null);
	const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
	const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
	const [resizeOverlay, setResizeOverlay] = useState<{
		width: number;
		height: number;
		x: number;
		y: number;
	} | null>(null);

	const handleDragStart = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			setIsDragging(true);
			setInitialPos({
				x: e.clientX - element.x,
				y: e.clientY - element.y,
			});
		},
		[element.x, element.y],
	);

	const handleResizeStart = useCallback(
		(direction: string) => (e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setIsResizing(true);
			setResizeDirection(direction);
			setInitialPos({ x: e.clientX, y: e.clientY });
			setInitialSize({ width: element.width, height: element.height });
		},
		[element.width, element.height],
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (isDragging) {
				requestAnimationFrame(() => {
					const newX = e.clientX - initialPos.x;
					const newY = e.clientY - initialPos.y;
					onUpdate({ x: newX, y: newY });
				});
			} else if (isResizing && resizeDirection) {
				e.preventDefault();
				const dx = e.clientX - initialPos.x;
				const dy = e.clientY - initialPos.y;

				let newWidth = initialSize.width;
				let newHeight = initialSize.height;
				let newX = element.x;
				let newY = element.y;

				if (resizeDirection.includes("right")) {
					newWidth = Math.max(50, initialSize.width + dx);
				}
				if (resizeDirection.includes("left")) {
					const adjustedWidth = Math.max(50, initialSize.width - dx);
					newX = element.x + (initialSize.width - adjustedWidth);
					newWidth = adjustedWidth;
				}
				if (resizeDirection.includes("bottom")) {
					newHeight = Math.max(50, initialSize.height + dy);
				}
				if (resizeDirection.includes("top")) {
					const adjustedHeight = Math.max(
						50,
						initialSize.height - dy,
					);
					newY = element.y + (initialSize.height - adjustedHeight);
					newHeight = adjustedHeight;
				}

				setResizeOverlay({
					width: newWidth,
					height: newHeight,
					x: newX,
					y: newY,
				});
			}
		},
		[
			isDragging,
			isResizing,
			resizeDirection,
			initialPos,
			initialSize,
			element.x,
			element.y,
			onUpdate,
		],
	);

	const handleMouseUp = useCallback(() => {
		if (isResizing && resizeOverlay) {
			onUpdate({
				width: resizeOverlay.width,
				height: resizeOverlay.height,
				x: resizeOverlay.x,
				y: resizeOverlay.y,
			});
		}
		setIsDragging(false);
		setIsResizing(false);
		setResizeDirection(null);
		setResizeOverlay(null);
	}, [isResizing, resizeOverlay, onUpdate]);

	useEffect(() => {
		const handleWindowMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				requestAnimationFrame(() => {
					const newX = e.clientX - initialPos.x;
					const newY = e.clientY - initialPos.y;
					onUpdate({ x: newX, y: newY });
				});
			} else if (isResizing && resizeDirection) {
				e.preventDefault();
				const dx = e.clientX - initialPos.x;
				const dy = e.clientY - initialPos.y;

				let newWidth = initialSize.width;
				let newHeight = initialSize.height;
				let newX = element.x;
				let newY = element.y;

				if (resizeDirection.includes("right")) {
					newWidth = Math.max(50, initialSize.width + dx);
				}
				if (resizeDirection.includes("left")) {
					const adjustedWidth = Math.max(50, initialSize.width - dx);
					newX = element.x + (initialSize.width - adjustedWidth);
					newWidth = adjustedWidth;
				}
				if (resizeDirection.includes("bottom")) {
					newHeight = Math.max(50, initialSize.height + dy);
				}
				if (resizeDirection.includes("top")) {
					const adjustedHeight = Math.max(
						50,
						initialSize.height - dy,
					);
					newY = element.y + (initialSize.height - adjustedHeight);
					newHeight = adjustedHeight;
				}

				setResizeOverlay({
					width: newWidth,
					height: newHeight,
					x: newX,
					y: newY,
				});
			}
		};

		const handleWindowMouseUp = () => {
			if (isResizing && resizeOverlay) {
				onUpdate({
					width: resizeOverlay.width,
					height: resizeOverlay.height,
					x: resizeOverlay.x,
					y: resizeOverlay.y,
				});
			}
			setIsDragging(false);
			setIsResizing(false);
			setResizeDirection(null);
			setResizeOverlay(null);
		};

		if (isDragging || isResizing) {
			window.addEventListener("mousemove", handleWindowMouseMove);
			window.addEventListener("mouseup", handleWindowMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleWindowMouseMove);
			window.removeEventListener("mouseup", handleWindowMouseUp);
		};
	}, [
		isDragging,
		isResizing,
		resizeDirection,
		initialPos,
		initialSize,
		element.x,
		element.y,
		onUpdate,
		resizeOverlay,
	]);

	return (
		<>
			<div
				ref={elementRef}
				className={cn(
					"absolute cursor-move border border-gray-300 hover:border-blue-500",
					(isDragging || isResizing) && "border-blue-500",
				)}
				style={{
					left: element.x,
					top: element.y,
					width: element.width,
					height: element.height,
					transition:
						isDragging || isResizing ? "none" : "all 0.1s ease",
					transform: "translate3d(0,0,0)",
				}}
				onMouseDown={handleDragStart}
			>
				<div className='w-full h-full bg-gray-100' />

				<ResizeHandle
					position='top'
					onResizeStart={handleResizeStart("top")}
				/>
				<ResizeHandle
					position='right'
					onResizeStart={handleResizeStart("right")}
				/>
				<ResizeHandle
					position='bottom'
					onResizeStart={handleResizeStart("bottom")}
				/>
				<ResizeHandle
					position='left'
					onResizeStart={handleResizeStart("left")}
				/>
				<ResizeHandle
					position='top-left'
					onResizeStart={handleResizeStart("top-left")}
				/>
				<ResizeHandle
					position='top-right'
					onResizeStart={handleResizeStart("top-right")}
				/>
				<ResizeHandle
					position='bottom-left'
					onResizeStart={handleResizeStart("bottom-left")}
				/>
				<ResizeHandle
					position='bottom-right'
					onResizeStart={handleResizeStart("bottom-right")}
				/>

				{(isDragging || isResizing) && (
					<SizeIndicator
						width={element.width}
						height={element.height}
					/>
				)}
			</div>

			{resizeOverlay && <ResizeOverlay {...resizeOverlay} />}
		</>
	);
}
