document.addEventListener('DOMContentLoaded', function() 
{
    const inputWebsiteName = document.getElementById('inputWebsiteName')

    const inputWebsiteURL = document.getElementById('inputWebsiteURL')

    const buttonSave = document.getElementById('buttonSave')

    const bookmarkField = document.getElementById('bookmark-field')

    let bookmarkArray = JSON.parse(localStorage.getItem('bookmarks')) || []

    // localStorage.getItem('bookmarks'): Lấy dữ liệu đã lưu với key "bookmarks". Dữ liệu này được lưu dưới dạng chuỗi JSON.

    // JSON.parse(...): Chuyển đổi chuỗi JSON thành một mảng trong JavaScript.

    // || []: Nếu không có dữ liệu trong localStorage, thay vì null, nó sẽ gán một mảng rỗng [] để tránh lỗi khi sử dụng.

    let bookmarkCount = bookmarkArray.length

    function loadBookmarks() 
    {
        bookmarkArray = JSON.parse(localStorage.getItem('bookmarks')) || []

        bookmarkField.innerHTML = ''

        bookmarkArray.forEach((bookmark, index) => 
        {
            const bookmarkType = document.createElement('div')

            bookmarkType.classList.add('bookmark-style')

            if(bookmark.name.toLowerCase() === 'google') 
            {
                const googleIcon = document.createElement('i')
                
                googleIcon.classList.add('bi', 'bi-google', 'text-primary', 'me-2', 'icon')
                
                bookmarkType.appendChild(googleIcon)
            }

            else if(bookmark.name.toLowerCase() === 'youtube') 
            {
                const youtubeIcon = document.createElement('i')

                youtubeIcon.classList.add('bi', 'bi-youtube', 'text-primary', 'me-2', 'icon')
                
                bookmarkType.appendChild(youtubeIcon)
            }

            else if(bookmark.name.toLowerCase() === 'tiktok') 
            {
                const tiktokIcon = document.createElement('i')

                tiktokIcon.classList.add('bi', 'bi-tiktok', 'text-primary', 'me-2', 'icon')
                
                bookmarkType.appendChild(tiktokIcon)
            }

            else if (bookmark.name.toLowerCase() === 'instagram') 
            {
                const instagramIcon = document.createElement('i')
                
                instagramIcon.classList.add('bi', 'bi-instagram', 'text-danger', 'me-2', 'icon')
                
                bookmarkType.appendChild(instagramIcon)
            }

            const bookmarkText = document.createElement('span')

            bookmarkText.innerHTML = `Website: &nbsp;<span style="color: red; font-weight: bold;">${bookmark.name}</span> - URL: <a href="${bookmark.url}" target="_blank" style="color: blue;">${bookmark.url}</a>`

            const deleteBtn = document.createElement('i')

            deleteBtn.classList.add('bi', 'bi-x-circle', 'text-danger', 'ms-2')

            deleteBtn.addEventListener('click', function() 
            {
                bookmarkArray.splice(index, 1)

                localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray))

                bookmarkCount--

                alert('Delete this bookmark successfully!')

                loadBookmarks()
            })

            bookmarkType.appendChild(bookmarkText)

            bookmarkType.appendChild(deleteBtn)

            bookmarkField.appendChild(bookmarkType)
        })
    }

    buttonSave.addEventListener('click', function() 
    {
        if(bookmarkCount === 4) 
        {
            alert('You cannot add more than 4 bookmarks, delete one of them and try again!')

            inputWebsiteName.value = ''

            inputWebsiteURL.value = ''
    
            return
        }
        
        const websiteName = inputWebsiteName.value

        const websiteURL = inputWebsiteURL.value

        if (websiteName === '' || websiteURL === '') 
        {
            alert('Website name and URL cannot be left blank!')

            return
        }     

        bookmarkArray.push({ name: websiteName, url: websiteURL })

        localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray))

        // JSON.stringify(bookmarkArray): Chuyển đổi mảng bookmarkArray thành chuỗi JSON để có thể lưu vào localStorage.

        // localStorage.setItem("bookmarks", ...): Lưu chuỗi JSON vào localStorage với key là "bookmarks".

        alert('Bookmark added successfully!')

        bookmarkCount++

        inputWebsiteName.value = ''

        inputWebsiteURL.value = ''

        loadBookmarks()
    })

    loadBookmarks()
})
