let addToCartButtons = document.querySelectorAll('.btn-outline-success');

addToCartButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
        const productId = event.target.getAttribute('data-id');
        console.log(productId);

        try {
            const responseProduct = await axios.get(`http://localhost:8080/api/products/${productId}`);
            const product = responseProduct.data;

            const responseUser = await axios.get('http://localhost:8080/api/sessions/current');
            const currentUser = responseUser.data;

            if (product.owner === currentUser.email && currentUser.role === 'premium') {
                Swal.fire({
                    title: 'Error',
                    text: 'No puedes agregar tu propio producto al carrito',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                });
            } else {
                await axios.post(`http://localhost:8080/api/carts/651cd552fef520effdaae934/product/${productId}`);
                Swal.fire({
                    title: 'Éxito',
                    text: 'Producto agregado al carrito',
                    icon: 'success',
                    confirmButtonText: 'Entendido'
                });
            }
        } catch (error) {
            alert(error.message);
        }
    });
});
