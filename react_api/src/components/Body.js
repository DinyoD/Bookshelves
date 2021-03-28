import Button from './Button';

const  Body = ({pageName}) => (
        <div className='body'>
            <h2 className='body-title'>Hello from {pageName}</h2>
            <div>
                <Button text='Add' color='white'/>
                <Button text='Remove' color='white'/>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo iure voluptatibus labore non voluptates, voluptate qui corporis dolor tempore, inventore blanditiis maiores? Eaque mollitia omnis temporibus voluptatum dignissimos consequatur molestiae.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo iure voluptatibus labore non voluptates, voluptate qui corporis dolor tempore, inventore blanditiis maiores? Eaque mollitia omnis temporibus voluptatum dignissimos consequatur molestiae.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo iure voluptatibus labore non voluptates, voluptate qui corporis dolor tempore, inventore blanditiis maiores? Eaque mollitia omnis temporibus voluptatum dignissimos consequatur molestiae.</p>
            <p>Здравейте, само тествам как изглежда фонът. Мерси!</p>
        </div>
);


Body.defaultProps ={
    pageName: 'Home'
}

export default Body;