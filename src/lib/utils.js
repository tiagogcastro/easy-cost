module.exports = { 
    // Transformando os números para fazer a idade
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        // Calculo da idade
        // Retorna o ano atual - ano nasc.
        let age = today.getFullYear() - birthDate.getFullYear()

        // Retorna o mes atual - mes nasc
        const month = today.getMonth() - birthDate.getMonth()

        // Retorna o dia
        birthDate.getDate()

        //
        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age -= 1
        }

        return age
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = `000${date.getUTCFullYear()}`.slice(-4)
        const month =`0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthday: `${day}/${month}`,
            format: `${day}/${month}/${year}`,
        } 
    }
}