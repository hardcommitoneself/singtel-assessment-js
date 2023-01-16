import { forwardRef, useRef, useEffect } from "react"

const Checkbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef()
      const resolvedRef = ref || defaultRef
  
      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return (
        <input className="relative w-6 h-6 sm:w-8 sm:h-8" type="checkbox" ref={resolvedRef} {...rest} />
      )
    }
)

export default Checkbox