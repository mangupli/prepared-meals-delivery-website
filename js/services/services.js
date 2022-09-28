const postData = async (url, data) =>{

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getData = async (url)=>{
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`${url} ${res.status} ${res.statusText}`);
    }

    return await res.json();
};

export {postData};
export {getData};