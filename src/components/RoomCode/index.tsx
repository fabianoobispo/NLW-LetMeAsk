import './room-code.scss';
import copyImg from '../../assets/images/copy.svg';

interface RoomCodeProps {
	code: string;
}

export function RoomCode(props: RoomCodeProps) {
	const copyRoomCodeToClipboard = () => {
		navigator.clipboard.writeText(props.code);
	}

	return (
		<button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span>Sala #{props.code}</span>
		</button>
	)
}