import React from 'react'

export default function FormGet() {
    let [searchResult, setSearchResult] = React.useState(null) 
    const form = React.useRef()

    const onSubmitForm = (event) => {
        event.preventDefault()

        const formData = new FormData(form.current)
        let params = new URLSearchParams(formData)
        let URL = '/api/form-get?' + params.toString() 

        fetch(URL)
            .then(response => response.json())
            .then(result => {
                setSearchResult(result)
            })
            .catch(err => alert(err))
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <form ref={form} onSubmit={onSubmitForm}>
                <label>ค้นหา:</label>&nbsp;
                <select id="target" name="target">
                    <option value='เว็บ'>เว็บ</option>
                    <option value='รูปภาพ'>รูปภาพ</option>
                    <option value='วิดีโอ'>วิดีโอ</option>
                </select> &nbsp;
                <input type="text" id="kw" name="kw" />&nbsp;
                <button type="submit">ตกลง</button>
            </form>
            <br />
            {searchResult && (
                <div>
                    ค้นหา {searchResult.target} ที่ตรงกับ: {searchResult.kw} <br />
                    พบข้อมูลทั้งหมด: {searchResult.results} รายการ
                </div>
            )}
        </div>
    )
}