const Button = ({text, color, path,  click}) => (
        <button 
            style={{backgroundColor: color}} 
            className='btn'
            onClick={() => click(path)}
        >
                {text}
        </button>
);

export default Button;