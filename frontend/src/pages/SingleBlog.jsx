import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleBlog } from "../store/reducers/reducers"
function SingleBlog() {
    const { id } = useParams()
    const { singleBlog:blog } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleBlog(id))
    }, [])
    return (
        <>
            {blog &&
                <div className="flex py-3 px-5 flex-col">
                    <img src={`/${blog.coverImageURL}`} className="w-full h-96 object-contain" />
                    <p className="font-bold text-3xl my-2">{blog.title}</p>
                    <p className="text-lg font-semibold my-2">{blog.body}</p>
                </div>
            }
        </>
    )
}

export default SingleBlog