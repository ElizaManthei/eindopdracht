export default function Input({
                                  idAttribute,
                                  nameAttribute,
    inputType,
    labelText,
    placeholderAttribute,
    validationRules,
    register,
    errors,
                              }) {
    return (
        <>
            <label htmlFor={idAttribute}>
                {labelText}
                <input
                    id = {idAttribute}
                    type={inputType}
                    placeholder={placeholderAttribute}
                    {...register(nameAttribute, validationRules)}
                />
            </label>
            {errors[nameAttribute] && <p>{errors[nameAttribute].message}</p>}
        </>
    )
}