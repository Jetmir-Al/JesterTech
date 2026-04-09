using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public interface IPurchaseRepository
    {
        List<Purchases> GetAll();  
        void CreatePurchase(Purchases purchases);   
        void UpdatePurchase(Purchases purchases);
        void DeletePurchase(Purchases purchases);
        void Save();
    }
}
