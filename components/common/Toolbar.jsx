import { Bold, Heading1, Heading2, Italic, List, ListOrdered, Redo, Strikethrough, Undo } from "lucide-react";

const Toolbar = ({editor}) => {
    if (!editor) {
        return null;
    }
    return (
        <div
            className="px-3 py-2 rounded-tl-md rounded-tr-md flex justify-between items-start
    w-full flex-wrap border border-input bg-primary/20"
        >
            <div className="flex justify-start items-center gap-2 w-full lg:w-10/12 flex-wrap">
                {/* Bold */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={
                        editor.isActive("bold")
                            ? "bg-primary text-white p-2 rounded-lg"
                            : "text-gray-800 p-2"
                    }
                >
                    <Bold className="size-4"/>
                </button>

                {/* Italic */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={
                        editor.isActive("italic")
                            ? "bg-primary text-white p-2 rounded-lg"
                            : "text-gray-800 p-2"
                    }
                >
                    <Italic className="size-4"/>
                </button>

                {/* Strikethrough */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    }}
                    className={
                        editor.isActive("strike")
                            ? "bg-primary text-white p-2 rounded-lg"
                            : "text-gray-800 p-2"
                    }
                >
                    <Strikethrough className="size-4"/>
                </button>

                {/* Heading1 */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({level: 1}).run();
                    }}
                    className={
                        editor.isActive("heading", {level: 1})
                            ? "bg-primary text-white p-2 rounded-lg"
                            : "text-gray-800 p-2"
                    }
                >
                    <Heading1 className="size-4"/>
                </button>

                {/* Heading2 */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({level: 2}).run();
                    }}
                    className={
                        editor.isActive("heading", {level: 2})
                            ? "bg-primary text-white p-2 rounded-lg"
                            : "text-gray-800 p-2"
                    }
                >
                    <Heading2 className="size-4"/>
                </button>

                {/* Bullet List */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={
                        editor.isActive("bulletList")
                            ? "bg-primary text-white p-2 rounded-lg"
                            : "text-gray-800 p-2"
                    }
                >
                    <List className="size-4"/>
                </button>

                {/* Ordered List */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleOrderedList().run();
                    }}
                    className={
                        editor.isActive("orderedList")
                            ? "bg-primary text-white p-2 rounded-lg"
                            : "text-gray-800 p-2"
                    }
                >
                    <ListOrdered className="size-4"/>
                </button>

                {/* Undo */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    }}
                    className={
                        "text-gray-800 p-2 hover:bg-gray-300 hover:rounded-lg"
                    }
                >
                    <Undo className="size-4"/>
                </button>

                {/* Redo */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    }}
                    className={
                        "text-gray-800 p-2 hover:bg-gray-300 hover:rounded-lg"
                    }
                >
                    <Redo className="size-4"/>
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
