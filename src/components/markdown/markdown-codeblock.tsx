export const CodeBlock = ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "")
    const language = match ? match[1] : ""

    if (language) {
        return (
            <div className="my-2">
                <div className="bg-gray-900 rounded-md overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-xs">
                        <span>{language}</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm">
                        <code className="text-gray-100">{children}</code>
                    </pre>
                </div>
            </div>
        )
    }

    return (
        <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
            {children}
        </code>
    )
}