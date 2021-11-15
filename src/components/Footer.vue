<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-1 mb-3">
          <h5>Kontakt</h5>
          <p>W razie jakichkolwiek pytań zapraszamy do kontaktu pod adresem <span class="active">biuro.ilumaps@gmail.com</span></p>
        </div>
        <div class="col-md-4 mb-3">
          <h5>Zamówienia specjalne</h5>
          <p>Jeżeli chciałbyś stworzyć mapę w kolorystyce, której nie ma wśród dostępnych motywów – napisz do nas! Przygotujemy coś specjalnie dla Ciebie.</p>
        </div>
        <div class="col-md-3 mb-3">
          <h5>Ważne linki</h5>
          <!-- <p class="mb-1"><a href="/faq" target="_blank">FAQ</a></p> -->
          <p class="mb-1"><a href="/regulamin" target="_blank">Regulamin</a></p>
          <p class="mb-1"><a href="/polityka-prywatnosci" target="_blank">Polityka prywatności</a></p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container text-center">
        ilumaps.pl <i class="fas fa-copyright px-1" aria-hidden="true"></i> 2019 - {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

footer {
  background-color: $iluColor2;
  padding-top: 50px;
  font-size: 13px;
  color: #9d9d9d;
  @media (max-width: 768px) {
    text-align: center;
    h5 {
      padding-top: 10px;
    }
  }
  h5 {
    padding-bottom: 5px;
    font-size: 18px;
  }
  .active {
    color: $iluColor;
  }
  a {
    color: $iluColor;
  }
  .footer-bottom {
    margin-top: 20px;
    background-color: #242839;
    color: #b1b1b1;
    padding: 10px 0;
    font-size: 12px;
  }
}
</style>
