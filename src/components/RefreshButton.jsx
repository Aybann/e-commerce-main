const RefreshButton = () => {
  const handleReload = () => {
    window.location.reload();
  }

  return ( 
    <>
      <button 
        onClick={handleReload} 
        className='secondary-button w-fit'
      >
        Refresh
      </button>
    </>
  );
}
 
export default RefreshButton;