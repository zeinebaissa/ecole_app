package com.backend.backend.repositories;
import com.backend.backend.models.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
}


