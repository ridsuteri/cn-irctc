import { Component } from "react";

class ClassBasedExample extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            photo: null,
            loading: true,
            error: null
        }
        console.log('[1]. constructor is running')
    }

    componentDidMount(){
        console.log('[3]. componentDidMount is running')
        fetch('https://jsonplaceholder.typicode.com/photos/1')
        .then((response)=>response.json())
        .then((data)=>this.setState({photo: data , loading: false}))
        .catch((err)=>this.setState({error: err.message, loading: false}))
    }

    componentDidUpdate(){
        console.log('[update] componentDidUpdate is running')
    }

    componentWillUnmount(){
        console.log('[Unmount] componentWillUnmount is running')
    }

    render(){
        console.log('[2]. render is running')
        const {loading, photo, err} = this.state; 
        return(
            <>
                <h1>Class Component</h1>
                {loading ? <>Loading ....</> : photo.title}
            </>
        )
    }
}

export default ClassBasedExample;