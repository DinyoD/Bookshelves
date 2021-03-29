const Button = ({text, color}) => (
        <button 
            style={{backgroundColor: color}} 
            className='btn'>
                {text}
        </button>
);

export default Button;