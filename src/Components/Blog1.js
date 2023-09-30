//Blogging App using Hooks
import {useState,useEffect} from "react";

export default function Blog(){

    //const [title,setTitle] =useState("");
    //const [content, setContent] = useState("");
    
    //setting title and content using one state,initializing with an object with keys title and content
    const [formData, setFormData] = useState({title:"",content:""})

    const [blogs, setBlogs]=useState([]);
    
    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title=blogs[0].title;
        }
        else{
            document.title="No Blogs!"
        }
    })
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();
        
        //set the blogs, which is an array so use square brackets
        setBlogs([{title :formData.title, content:formData.content},...blogs]);
        setFormData({title:"",content:""});
        

        console.log(blogs);
    }

    function removeBlog(i){
        
        //filtering out the blog for which i matchess
        //sets the blog including every blog except the one which is clicked for deletion i.e "i" is same
        setBlogs(blogs.filter((blog,index) => i!==index))
    }



    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                               placeholder="Enter the Title of the Blog here.."
                               value={formData.title}
                               onChange= { (e)=> setFormData({title:e.target.value, content:formData.content})} //need to update the whole object everytime we update one property or else only last change will be considereds
                        />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                  placeholder="Content of the Blog goes here.."
                                  value={formData.content}
                                  onChange={ (e)=> setFormData({title:formData.title, content:e.target.value})}
                        />
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
             {blogs.map((blog,i)=>(
                <div className="blog" key={i}>
                      <h3>{blog.title}</h3>
                      <p>{blog.content}</p>

                      <div className="blog-btn">
                        <button onClick={()=>removeBlog(i)} className="btn remove">
                            Delete
                        </button>
                      </div>
                </div>
             ))}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
