import './room-code.scss';
import copyImg from '../../assets/images/copy.svg';
import toast, { Toaster } from 'react-hot-toast';

interface RoomCodeProps {
	code: string;
}

export function RoomCode(props: RoomCodeProps) {
	const copyRoomCodeToClipboard = () => {
		navigator.clipboard.writeText(props.code);
		toast('Código de sala copiado.');
		
	}

	return (
<>
		<Toaster
		
		position="top-right"
		 />
		<button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span>Sala #{props.code}</span>			
		</button>

		</>
	
	)
}