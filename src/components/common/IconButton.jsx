
function IconButton({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type
})
{
    return(
        <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-richblack-550 bg-transparent" : "bg-richblack-550"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-richblack-550"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
}

export default IconButton;