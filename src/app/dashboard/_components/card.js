export default function Card(props) {
    const id = props.id
    const title = props.title
    const author = props.author
    const content = props.content
    const contentPage = props.contentPage
    return (
        <a id={id} href={contentPage} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700">
            <div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-2 font-light text-gray-600 dark:text-gray-400">{author}</p>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">{content}</p>
        </a>
    )
}