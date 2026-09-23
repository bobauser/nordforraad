export function UndefinedWordDefinition(standard_definition: string, academic_definition: string) {
    if (standard_definition && academic_definition)
    {
        if (standard_definition != "" && academic_definition != "")
        {
            return true // word has definition
        } else return false
    } else return false
}
//Rule: if a word contains both standard and academic definitions. FIXME: better functionname?