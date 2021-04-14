import authorsService from '../../services/authorsService';

const CreateAuthorForm = ({createAuthor}) => {

    const submitHandler = async(e)=> {
        e.preventDefault();

        let author = {
            name: e.target.name.value,
            pictureUrl: e.target.pictureUrl.value,
            yearOfBirth: e.target.yearOfBirth.value
        }

        let createdAuthor = await authorsService.create(author);
        console.log(createdAuthor);

        createAuthor(createdAuthor);
    }
    return(

        <form className='form' onSubmit={submitHandler}>
            <h2 className="form-control">Create New Book's Author:</h2>
            <div className="form-control">
                <label htmlFor="name">Aurthor name: </label>
                <input className='form-input-book' type="text" id='name' name='name'/>
            </div>

            <div className="form-control">
                <label htmlFor="pictureUrl">Author picture: </label>
                <input className='form-input-book' type="text" id='pictureUrl' name='pictureUrl'/>
            </div>

            <div className="form-control">
                <label htmlFor="yearOfBirth">Author year of Birth: </label>
                <input className='form-input-book' type="number" id='yearOfBirth' name='yearOfBirth'/>
            </div>

            <input type="submit" className='btn form-btn' value='Submit New Author'/>

        </form>

    )
}

export default CreateAuthorForm;