import React from "react";

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state = {hasError: false}
    }

    // static getDerivedStateFromError(error){
    //     return this.setState({hasError: true})
    // }
    componentDidCatch(error, errorInfo){
        // logErrorToMyService(error, errorInfo)
        this.setState({hasError: true})
        console.log(error, errorInfo)
    }
    render(){
        const {hasError} = this.state
        
        if(hasError){
            return (
                <p>Hello how are you doing today please</p>
            )
        }
        return this.props.children
    }
}   

export default ErrorBoundary