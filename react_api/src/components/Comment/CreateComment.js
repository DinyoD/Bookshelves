const CreateComment = () => {
   return (
    <form className='form'>
        <label htmlFor="comment">
            write your comment:
            <input className='btn' type="button" value="Submit"/>
        </label>
        <br/>
        <textarea name="comment" id="comment" cols="100" rows="5"></textarea>
        <br/>
    </form>
    )   
}

export default CreateComment;