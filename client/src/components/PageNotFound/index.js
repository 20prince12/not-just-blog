import catvibing from '../../assets/catvibing.gif';


const PageNotFound = (props) => {
    return (
        <div className="ml-52">
        <img className="object-center w-full" src={catvibing} alt="loading..." />
            <h2 className="dark:text-gray-50 float-right mt-20 font-extrabold text-9xl dark:text-gray-600">
                <span className="sr-only">Error</span>404
                <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
            </h2>
        </div>
    )
}

export default PageNotFound;