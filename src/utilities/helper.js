
const formFieldBuilder = (props) => {
    return ({
        elementType: props.elementType,
        elementConfig: {
            type: props.type,
            placeholder: props.placeholder
        },
        value: props.value
    });
}

export default formFieldBuilder;