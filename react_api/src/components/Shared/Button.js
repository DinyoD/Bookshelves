const Button = ({text, color, click}) => (
        <button 
            style={{backgroundColor: color}} 
            className='btn'
            onClick={() => click(text)}
        >
                {text}
        </button>
);

export default Button;